import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RolePage } from "@/components/role-page";
import { roles } from "@/data/roles";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return roles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.find((item) => item.slug === slug);
  if (!role) return { title: "Role not found | Dhruv Singh" };
  return createPageMetadata(`${role.title}${role.emerging ? " (Emerging)" : ""} | Dhruv Singh`, role.summary, `/roles/${role.slug}`);
}

export default async function RoleRoute({ params }: Props) {
  const { slug } = await params;
  const role = roles.find((item) => item.slug === slug);
  if (!role) notFound();
  return <RolePage role={role} />;
}
