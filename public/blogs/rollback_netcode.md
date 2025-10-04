# Rollback Netcode: My Insights

## 1. What Is Netcode?
"Netcode" is a term gamers use to talk about how online games handle connections between players. When things go wrong like lag, random game jumps, or actions not showing up properly, players often blame the netcode. While these problems can be caused by bad coding, they’re usually due to network issues like high ping, packet loss or internet slowdowns. Problems with a player’s computer like low frame rates can also mess things up. Good netcode helps hide these issues and keeps the game running smoothly for everyone.

***

## 1. The Simplest Idea: Just Send the Game State

Before diving into specific netcode models, a common first thought is: "why not just have each player's game send its entire state to every other player?" In theory, if Player A sends their game data to Player B, Player B could just load that state and be perfectly in sync.

### Why This Doesn't Work

This approach fails for two reasons:

* **Massive Bandwidth Demands:** A game's state includes the position, animation, health, and status of every single object and character. This is a huge amount of data. Sending it 60 times per second would require more bandwidth than most internet connections can handle, making it impractical.

* **The Problem of "Now":** Due to network latency, data doesn't arrive instantly. Player A's state from a specific moment would arrive at Player B's machine a fraction of a second later. In that time, Player B's own state has already changed. Synchronizing these snapshots would result in a jittery mess.

Because directly sharing the game state is not feasible, developers needed a more efficient way to keep players synchronized. This led to input-based models, starting with the delay-based approach.

## 2. The Delay-Based Approach

Delay-based netcode is the traditional method for synchronizing an online game.

Its operation is straightforward: the game **pauses and waits** to receive inputs from all players in a network session before it simulates the next frame of the game. For the game to advance from frame `100` to `101`, it must have the confirmed inputs for frame `100` from every single player. This guarantees that every player's simulation is always perfectly in sync, as they are all working with the exact same data.

### Why this method was chosen initially
This model was popular in early online gaming, especially for arcade and console titles ported to online play.
* **Simplicity:** It's much easier to implement than rollback. The logic is simple: get all inputs, then advance the game. This avoids the complex challenges of state management and prediction.
* **Stability:** Because the game state is always 100% synchronized across all machines, there is zero chance of players' games diverging (a "desync"). It is fundamentally deterministic and reliable.

### Benefits and downsides
The primary benefit is its **simplicity**. However, its major downside is the user experience, which suffers from **input lag**. The built-in delay is determined by the player with the highest ping. If you have a 20ms ping but your opponent has a 150ms ping, you both have to wait for that 150ms round-trip before the game registers your inputs. Since ping is always changing, you have to adapt your inputs/combos differently based on the input delay. This makes the game feel sluggish, unresponsive, and borderline unplayable at higher latencies.

***

## 3. A New Challenger! Rollback Netcode
Rollback netcode is a modern approach designed specifically to eliminate the input lag that plagues the delay-based model. Its primary goal is to make online gameplay feel as responsive as playing offline, even over connections with significant latency.

### How it works
Instead of waiting, rollback operates on a philosophy of ***"act now, correct later."***

1.  **Immediate Response & Prediction:** When you press a button, the game responds *instantly*. It does not wait for your opponent's input. To keep the game running, it **predicts** what your opponent is going to do. A common and  prediction is to simply assume the opponent will continue doing whatever their last input was (e.g., continue walking forward, or continue blocking).

2.  **The Rollback:** When your opponent's actual input arrives from the network, the game compares it to the prediction.
    * **If the prediction was correct:** Great! Nothing changes, and the game continues.
    * **If the prediction was wrong:** A rollback is needed! The game loads the last synchronized state, applies the *correct* inputs for both players, and re-simulates the game forward to the current time. This entire process should happen within a single screen refresh.

<img src="/images/blogs/rollbacknetcode/RollbackChart.png" alt="Flowchart of the rollback process" width="500"/>

To the player, this correction appears as a minor, instantaneous "teleport" or "pop" of the opponent's character to their correct position. The trade-off is this: players experience immediate input response at the cost of seeing subtle visual corrections in their opponent. For any fast-paced game, this is still preferred over the sluggish feeling of input delay.

***

## 4. Implementing Rollback For ChromaClash

ChromaClash was designed to be a fast-paced, combo-heavy fighting game where reactive actions are critical. The input lag from a delay-based model would comrpomise the feel of the game. However, due to technical constraints and the desire for a deeper understanding, I couldn't use an external library and instead built the rollback netcode from scratch.

#### Applying Rollback Concepts to ChromaClash

Implementing rollback was far more of an architectural challenge than a networking one.

I started with a very simple `GameState` that tracked the essentials: player **positions**, **velocities**, and **collision boxes**. The entire simulation was built to run at a [fixed 60Hz by accumulating time](https://medium.com/@tglaiel/how-to-make-your-game-run-at-60fps-24c61210fe75) (Though the rendering loop is still based on frame-rate). With a simulation running locally, I began developing the core components of rollback netcode.

1.  **Input Handling:** 
    Each player has an input history, which is a circular buffer that stores the last 60 inputs. When the remote player sends their inputs, the history is evaluated and updated. There is also a *fixed* input delay of 3 frames. This helps mitigate the effects of latency as it gives time for remote inputs to arrive, reducing the frequency of rollbacks. 
2.  **Packet Sending:** 
    Packets are stored in a byte buffer with 20 entries. Each entry contains `8` bits, which is `1` byte, giving us `255` unique input combinations. Before I used regular arrays but lua automatically uses a 64-bit signed integer. Thats `9.2^18` different combinations! Way more bytes than needed. Packets also contain a `4` bit entry which contains the current local frame. In total, each packet sent is `25` bytes (`1.5kb` a second!) which is extremely performant. These packets are sent between clients every frame.
3. **Time Synchronization:**  
   The game ensures both clients stay on the same timeline using an NTP-inspired algorithm. When a new confirmed frame is received, the client calculates the difference between its local frames and the remote frames. If the local game is too far ahead (beyond a defined `FRAME_ADVANTAGE_LIMIT`), it enters a resync phase. During this phase, the client skips frame updates by decrementing its `tickOffset` until the difference falls back under the threshold. This prevents overshooting and keeps both timelines aligned, ensuring synchronized gameplay even when one client drifts ahead.
4. **Rollback Handling:**  
   When a desync occurs, the game rewinds to the last confirmed synchronized frame and re-simulates all subsequent frames. First, the most recent game state is restored from `StateManager`. Then, for each rollback frame, the system re-fetches inputs (using replay data if in replay mode, otherwise live inputs) and advances the simulation forward again. If a frame becomes confirmed during this process, it saves the updated game state and updates `syncFrame` accordingly. This ensures both clients remain consistent, correcting any divergence caused by latency or packet delay.
5. **State Management:**  
   Restoring a state involves deep cloning the saved snapshot, resetting the current `GameData`, and cleaning up any leftover connections, projectiles, or effects to ensure the game world matches the restored frame. Confirmed states are saved when the local frame aligns with the sync frame and is still within the confirmed window, ensuring rollback safety. This approach is simple but not the most performant. A potential improvement is to implement delta-based state saving, where only the differences (deltas) between frames are stored instead of full deep clones of the game state. This would significantly reduce memory usage and improve performance, since most frames share a majority of their data.


## 4. Setbacks & Challenges
### Desynchronizations
The single greatest challenge was achieving **100% determinism**. For a rollback to work, re-simulating frames with the same inputs *must* produce the exact same game state on every machine. Any subtle difference will cause the games to drift apart, leading to a desync.

Far into development of ChromaClash, I forgot to account for fixed-point math in my code and used floats. Since I chose **lua** as my language of choice, there was no fixed floating point math. As a result I had to eliminate all floats in my code and only use integer math. This was an extremely tedious but necessary correction I had to make.

### Ghost Audio/Effects
During a rollback and re-simulation, the game would trigger sound/visual effects (like a punch landing) multiple times in quick succession. The player would hear a repetitive sound or see the same effect multiple times.

The solution was to decouple event triggers (like playing sounds or showing particle effects) from the core simulation. My simulation now produces a list of "events" for a given frame. The presentation layer is then responsible for only playing the events from the final, corrected frame that gets rendered to the screen, ignoring any events generated during the rapid re-simulation.

## 5. Takeaways & Final Thoughts
This was an incredibly challenging but rewarding process that taught me more about game architecture than any other project.

### What I learned
The most important lesson is that **rollback netcode forces you to write clean code**. You must create a clear separation between your core game logic and everything else (graphics, sound, UI). It's not a "networking feature" you can add later. It has to be a foundational part of your game's design from the very beginning.

### What I'd do differently in the future
I would design for determinism from day one. Trying to refactor a non-deterministic engine to be deterministic is a nightmare. I would also start by integrating a proven library like [GGPO](https://www.ggpo.net/) or a modern equivalent first, rather than trying to build the entire system from scratch. Building it yourself is a great learning experience, but using a library gets you a result much faster.

### Advice for others implementing rollback netcode
1.  **Solve for Determinism First:** Before you write a single line of networking code, make sure your game is 100% deterministic. Create a system that records inputs, saves a state, and can replay the game from that state, ensuring it ends up identically every time.
2.  **Separate Simulation from Presentation:** Your game logic should know nothing about rendering, audio, or special effects. It should only update the game state based on inputs.
3.  **Keep It Simple, Stupid:** Don't try to implement rollback on your dream 100-character fighting game first. Start with the simplest possible game to understand the core concepts in an environment where debugging is easy.
