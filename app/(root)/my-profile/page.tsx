import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import React from "react";

const page = () => {
  return (
    <>
      <form
        action={async (e) => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button className="text-black">Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks}></BookList>
    </>
  );
};

export default page;
