import GoogleDocEmbed from "@components/GoogleDocEmbed";
import CvButton from "@components/CvButton";

function BlogList() {
  return (
    <>
      <CvButton />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
        }}
      >
        <GoogleDocEmbed
          publicUrl="https://docs.google.com/document/d/15XsQiQ9Ve6SaYzA75a2NN_CBKZd0AZw5pGCpJen6u_k/edit?usp=sharing"
          height="100%"
          className="docEmbed"
        />
      </div>
    </>
  );
}

export default BlogList;
