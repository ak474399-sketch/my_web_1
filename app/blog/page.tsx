import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Calendar, User } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, tutorials, and stories about AI photo restoration — learn how to bring your old photos back to life.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-warm-50">
      <section className="border-b border-warm-200 bg-warm-100">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
            <BookOpen className="w-7 h-7 text-accent" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-warm-800 mb-3">
            Blog
          </h1>
          <p className="text-warm-500 max-w-lg mx-auto text-sm sm:text-base">
            Tips, tutorials, and stories about AI photo restoration.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:py-14 md:py-20">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-400 text-lg">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-warm-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-warm-300 transition-all duration-200"
              >
                {post.coverImage && (
                  <div className="aspect-[16/9] overflow-hidden bg-warm-100">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <div className="flex items-center gap-3 text-xs text-warm-400 mb-3">
                    {post.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    )}
                    {post.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-lg sm:text-xl font-semibold text-warm-800 mb-2 leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-warm-500 text-sm leading-relaxed flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-medium text-accent bg-accent/8 rounded-full px-2.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t border-warm-100 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
