import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { CommitteeMember } from "@/data/fallback-committee";

interface Props {
  members: CommitteeMember[];
}

function MemberCard({ member }: { member: CommitteeMember }) {
  const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="relative mb-4 rounded-[40%] border-2 border-fbc-border overflow-hidden flex-shrink-0"
        style={{ width: 120, height: 150 }}
      >
        {member.photo && !member.photo.includes("ui-avatars") ? (
          <Image src={member.photo} alt={member.name} fill className="object-cover" sizes="120px" />
        ) : (
          <div className="w-full h-full bg-fbc-card flex items-center justify-center">
            <span className="font-space font-bold text-xl text-fbc-sky/70">{initials}</span>
          </div>
        )}
      </div>
      <h3 className="font-space font-semibold text-fbc-light-text dark:text-fbc-white text-sm leading-tight mb-1">
        {member.name}
      </h3>
      <p className="text-fbc-light-sub dark:text-fbc-muted text-xs leading-snug px-2">{member.role}</p>
    </div>
  );
}

function OthersCard({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="relative mb-4 rounded-[40%] border-2 border-fbc-border overflow-hidden flex-shrink-0 bg-fbc-card flex items-center justify-center"
        style={{ width: 120, height: 150 }}
      >
        <div className="grid grid-cols-4 gap-1 p-3">
          {Array.from({ length: Math.min(count, 12) }).map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-fbc-blue/60 to-fbc-sky/40 border border-fbc-border" />
          ))}
        </div>
      </div>
      <h3 className="font-space font-semibold text-fbc-light-text dark:text-fbc-white text-sm leading-tight mb-1">
        +{count} other members
      </h3>
      <p className="text-fbc-light-sub dark:text-fbc-muted text-xs">Across 10 teams</p>
    </div>
  );
}

export default function CommitteeSection({ members }: Props) {
  const preview = members.slice(0, 3);
  const rest = members.length - 3;

  return (
    <section id="committee" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-space font-bold text-3xl md:text-5xl text-fbc-light-text dark:text-fbc-white mb-2">
            The humans behind the chaos
          </h2>
          <p className="text-fbc-light-sub dark:text-fbc-muted text-base mb-12 max-w-xl">
            They volunteered. We still don&apos;t know why. But the conference exists, so.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {preview.map((m) => (
            <MemberCard key={m.name} member={m} />
          ))}
          <OthersCard count={rest > 0 ? rest : 13} />
        </div>

        <AnimateOnScroll delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#volunteer"
              className="rounded-full px-8 py-3.5 font-space font-semibold border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all text-center"
            >
              Apply to volunteer →
            </Link>
            <Link
              href="/about#committee"
              className="rounded-full px-8 py-3.5 font-space font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] text-center"
            >
              See full committee →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
