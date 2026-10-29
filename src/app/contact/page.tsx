import { redirect } from "next/navigation";

// Keeps choosevestis.com/contact working (e.g. on business cards) by sending people to the form.
export default function Contact() {
  redirect("/#contact");
}
