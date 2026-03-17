import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { mockNews } from '../mocks/news';

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const article = mockNews.find(news => news.id === id);

  if (!article) {
    return (
      <div className="bg-base min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">Article Not Found</h1>
          <Link to="/news" className="text-primary hover:underline">Back to News</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-12">
        <Link to="/news" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Link>

        <article>
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
            />
          )}

          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-sm text-secondary/60">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {article.author}
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-secondary">
            <p className="text-lg leading-relaxed mb-4">{article.excerpt}</p>
            <div className="text-base leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}