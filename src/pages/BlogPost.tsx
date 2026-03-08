import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  cover_image: string | null;
  author: string;
  published_at: string | null;
  created_at: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, content, cover_image, author, published_at, created_at")
        .eq("slug", slug!)
        .maybeSingle();
      setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <SectionWrapper>
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </SectionWrapper>
    );
  }

  if (!post) {
    return (
      <SectionWrapper className="text-center">
        <h2 className="text-2xl font-display font-bold mb-4">Article Not Found</h2>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or hasn't been published yet.</p>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <article className="max-w-3xl mx-auto">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/blog" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.published_at || post.created_at).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {post.author}
          </span>
        </div>

        {post.cover_image && (
          <div className="rounded-xl overflow-hidden mb-10">
            <img src={post.cover_image} alt={post.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:font-bold
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </SectionWrapper>
  );
}
