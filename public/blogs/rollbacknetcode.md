# Rollback Netcode: The Secret Weapon of Competitive Fighting Games

## Overview

If you’ve ever played a fighting game online, you know how important **responsiveness** is. A single frame of delay can mean the difference between landing a combo or eating a punish. That’s where **rollback netcode** comes in—the unsung hero that makes modern online matches feel as close to offline as possible.

---

### The Problem with Delay-Based Netcode
Traditional online play often used **delay-based netcode**, which waits to receive your opponent’s input before showing the result. The issue?  
- **Input delay:** Everything feels sluggish.  
- **Unfair reactions:** Players with lower ping get an advantage.  
- **Worse with distance:** The farther your opponent is, the slower the game feels.

In fast-paced fighting games, where every frame counts, this is a nightmare.

---

### How Rollback Works
Rollback netcode flips the script. Instead of waiting, it **predicts your opponent’s actions** based on their previous inputs:  
1. **Prediction:** The game guesses what your opponent will do.  
2. **Correction:** If the guess is wrong, the game “rolls back” a few frames and replays the correct action instantly.  
3. **Seamless experience:** You rarely notice corrections, since they happen in just a few frames.

The result? Your inputs feel **immediate**, no matter the connection.

---

### Why Players Love It
- **Responsiveness:** You can perform combos and reacts as if you were offline.  
- **Fairness:** Both players experience the match at the same speed.  
- **Play with anyone:** Distance matters less—you can fight people across the world.  

Rollback turns what would be an unplayable online fight into a competitive experience.

---

### Games That Use Rollback
Many modern fighting games now use rollback thanks to its success:  
- **Street Fighter 6**  
- **Guilty Gear: Strive**  
- **Skullgirls**  
- **Mortal Kombat 1**  

And the list keeps growing as more developers adopt it.

---

### The Future of Fighting Games
Rollback netcode is no longer just a “nice feature”—it’s becoming the **standard**. Communities actively demand it, and games without it struggle to survive competitively. For fighting games, where **precision and fairness** define the experience, rollback isn’t just a tool—it’s a **secret weapon**.

---


## Under the Hood

On the surface, rollback feels like magic. But the system is actually a clever mix of **input prediction, state management, and frame correction**.

### 1. Input Delay vs. Prediction
Every online game needs to synchronize two players’ inputs. Delay-based netcode solves this by adding a buffer:  
- Wait for both inputs → then simulate the next frame.  
- Result: reliable, but everything feels sluggish.

Rollback takes a different approach:  
- **Run the game immediately** with whatever inputs are available.  
- If your opponent’s input hasn’t arrived yet, **predict** it (usually “keep doing what they were doing”).  

This makes your own actions feel instant.

---

### 2. Rollbacks & State Rewinds
When the “real” input finally arrives, the game checks if the prediction was correct:  
- **Correct guess →** no problem, keep going.  
- **Wrong guess →** the game *rewinds* to the past state, applies the correct input, and simulates forward again until the present frame.

This happens in milliseconds, so instead of seeing a pause, you just notice a tiny visual correction (like your opponent suddenly blocking instead of attacking).

---

### 3. The State Buffer
To make rewinds possible, the game keeps a **history of past states** (positions, health, projectiles, timers, etc.):  
- Typically stores the last **6–10 frames**.  
- Each state is lightweight—just the data needed to re-simulate.  
- When a correction is needed, the engine restores a saved state and replays.

---

### 4. Hiding the Rollbacks
Rollback would look jarring if shown directly. Developers use tricks to make it feel invisible:  
- **Animations interpolate** between corrected positions.  
- **Particles and effects** often don’t rewind, reducing visual “snapping.”  
- **Input leniency** helps ensure combos still connect even through small corrections.

To players, the action looks smooth and consistent—even if the engine is secretly doing time travel.

---

### 5. Bandwidth & Lag
Rollback also handles bad connections gracefully:  
- With *low ping*, predictions are almost always right, so rollbacks rarely trigger.  
- With *high ping*, rollbacks happen more often, but inputs still feel immediate.  
- With *packet loss*, the engine can re-simulate once the missing input arrives.

In the worst cases, you might see characters “teleport” or jitter—but it’s still usually more playable than heavy input delay.

---

## Why This Works Best in Fighting Games
Rollback is especially effective in fighting games because:  
- They run at **fixed frame rates** (usually 60 FPS).  
- States are relatively simple compared to open-world or physics-heavy games.  
- Inputs are discrete (up, down, punch, kick), making predictions very reliable.  

That’s why rollback feels so natural in fighters, but is harder to implement in complex 3D simulations or shooters.
