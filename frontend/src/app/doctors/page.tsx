import Head from "next/head";
import DoctorsClient from "./DoctorsClient";

export const metadata = {
  title: "General Physicians & Internal Medicine | Doctor Listing",
  description: "Find experienced general physicians and internal medicine specialists near you. Book appointments and consult online.",
};

export default function DoctorsPage() {
  return (
    <>
      <Head>
        <title>General Physicians & Internal Medicine | Doctor Listing</title>
        <meta
          name="description"
          content="Find experienced general physicians and internal medicine specialists near you. Book appointments and consult online."
        />
      </Head>
      <DoctorsClient />
    </>
  );
}
