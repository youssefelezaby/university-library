import { auth } from "@/auth";
import Header from "@/components/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { ReactNode } from "react";
const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) return redirect("/sign-in");

  after(async () => {
    if (!session?.user?.id) return;

    // get the user and see if the lasyt activity date is today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1);

    if (user[0].LastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    // if not, update the last activity date to today
    await db
      .update(users)
      .set({ LastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));
  });
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
