import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Container, Badge } from "@/components/ui/Primitives";
import { blogPosts } from "@/data/content";
import { formatDate } from "@/lib/utils";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <div className="section-pad text-center text-ink/50 pt-32">Post not found.</div>;

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />

      <article className="section-pad pt-12">
        <Container className="max-w-3xl">
          <Link to="/blog" className="btn-ghost mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to journal
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge>{post.category}</Badge>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">{post.title}</h1>

            <div className="mt-6 flex items-center gap-3">
              <img src={post.author.avatarUrl} alt={post.author.name} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-ink">{post.author.name}</p>
                <p className="flex items-center gap-1.5 text-xs text-ink/45">
                  {post.author.role} · {formatDate(post.publishedAt)} ·
                  <Clock className="h-3 w-3" /> {post.readingTimeMinutes} min read
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 overflow-hidden rounded-xl2 border border-white/[0.07]"
          >
            {post.coverImage ? (
              <img src={post.coverImage} alt={post.title} className="aspect-[16/9] w-full object-cover" />
            ) : (
              <div className="aspect-[16/9] w-full bg-obsidian-light flex items-center justify-center">
                <span className="text-ink/20">Photo coming soon</span>
              </div>
            )}
          </motion.div>

          <div className="prose-outhood mt-10 space-y-5 text-base leading-relaxed text-ink/70">
            <p>{post.excerpt}</p>
            <p>
              This article is part of the Outhood Journal — a space where we share the stories, lessons, and
              behind-the-scenes moments from the road trips, events, and charity work our community shows up for.
              Full long-form content for this piece is being finalized by our editorial team.
            </p>
            <p>
              Want to be part of the next story? Browse upcoming events and road trips, or apply to volunteer with
              one of our active campaigns.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-white/[0.06] pt-8">
            <Link to="/services" className="btn-primary">
              Browse upcoming events
            </Link>
            <Link to="/community" className="btn-secondary">
              Join the community
            </Link>
          </div>
        </Container>
      </article>

      <section className="section-pad border-t border-white/[0.06] bg-obsidian-light/40">
        <Container>
          <h2 className="text-xl font-bold text-ink">More from the journal</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} to={`/blog/${r.slug}`} className="group card-surface block overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={r.coverImage} alt={r.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-ink transition-colors group-hover:text-gold">{r.title}</p>
                  <p className="mt-1.5 text-xs text-ink/45">{formatDate(r.publishedAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
