import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About | Faisal",
  description: "About Faisal, an AI engineer building computer vision, deep learning and full-stack projects.",
};

export default function About() {
  return (
    <PageShell title="About">
      <p>
        I&apos;m Faisal, an AI engineer and creative developer. I build smart solutions with machine learning, from
        computer vision to bioinformatics, and I like turning raw data into something people can actually use.
      </p>
      <h2>What I work on</h2>
      <ul>
        <li>Computer vision, such as real-time traffic analysis with YOLOv8 and Detectron2</li>
        <li>Deep learning, such as CNN-based classification on custom image datasets</li>
        <li>Bioinformatics, such as finding antimicrobial resistance markers in DNA sequences</li>
        <li>Full-stack web development with Laravel, Flask and MySQL</li>
      </ul>
      <h2>Tools I use</h2>
      <p>
        TensorFlow, PyTorch, Scikit-learn and Keras for modelling; Python, Java and C/C++ for engineering; Pandas,
        NumPy and Power BI for analysis; and AWS, Google Cloud, Docker and Git for deployment.
      </p>
      <h2>About this site</h2>
      <p>
        This portfolio shows a selection of my recent projects and skills. You can find ways to reach me on the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </PageShell>
  );
}
