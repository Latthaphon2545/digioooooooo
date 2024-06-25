import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <button className="btn btn-primary">Go to Home</button>
      </Link>
    </div>
  );
}
