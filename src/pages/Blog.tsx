import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Clock, ArrowRight } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Container, Eyebrow, Badge } from "@/components/ui/Primitives";
import { blogPosts } from "@/data/content";
import { formatDate } from "@/lib/utils";

export default function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];
  const [featured, ...rest] = blogPosts;

  const filtered = useMemo(() => {
    return rest.filter((post) => {
      const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || post.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category, rest]);

  return (
    <>
      <Seo
        title="Blog"
        description="Stories, guides, and updates from the Outhood community — road trips, volunteering, and impact stories."
        path="/blog"
      />

      <section className="section-pad pt-12">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>The Outhood Journal</Eyebrow>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Stories from the road and the field.
            </h1>
          </motion.div>

          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 gap-6 overflow-hidden rounded-xl2 border border-white/[0.08] lg:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                {featured.coverImage ? (
                  <img src={featured.coverImage} alt={featured.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full min-h-[220px] bg-obsidian-light flex items-center justify-center">
                    <span className="text-ink/20 text-sm">Photo coming soon</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-7 lg:p-10">
                <Badge>{featured.category}</Badge>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-gold sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3">
{featured.author.avatarUrl ? (
                    <img src={featured.author.avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs">
                      {featured.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-ink">{featured.author.name}</p>
                    <p className="flex items-center gap-1 text-xs text-ink/40">
                      {formatDate(featured.publishedAt)} · <Clock className="h-3 w-3" /> {featured.readingTimeMinutes} min read
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Filters */}
          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    category === cat
                      ? "border-gold/40 bg-gold/10 text-gold"
                      : "border-white/10 text-ink/55 hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/30 focus:border-gold/30 focus:outline-none"
              />
            </div>
          </div>

          {/* Post grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link to={`/blog/${post.slug}`} className="group card-surface block overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    {post.coverImage ? (
              <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="h-full w-full bg-obsidian-light flex items-center justify-center min-h-[200px]">
                <span className="text-ink/20 text-sm">Photo coming soon</span>
              </div>
            )}
                  </div>
                  <div className="p-5">
                    <Badge tone="neutral">{post.category}</Badge>
                    <h3 className="mt-3 text-base font-bold leading-snug text-ink transition-colors group-hover:text-gold">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-ink/50">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs text-ink/40">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readingTimeMinutes} min
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full py-10 text-center text-sm text-ink/40">No articles match your search.</p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
