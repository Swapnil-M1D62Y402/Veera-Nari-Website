"use client";
import { useState, useEffect, JSX } from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import DashBoard_Navbar from "./dashboard_navbar";
import { newsService } from "@/app/api/api";
import { 
  Newspaper, 
  Calendar, 
  ExternalLink
} from "lucide-react";
import { Button } from "./ui/button";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await newsService.getNewsAndTips();
        
        if (!response?.articles) {
          throw new Error('No articles found in response');
        }
        
        if (response.articles.length === 0) {
          setError('No news articles available at the moment.');
          return;
        }
        
        setNews(response.articles);
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setError(
          error instanceof Error 
            ? error.message 
            : 'Unable to load news. Please check your internet connection and try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-[#121212]">
        <SidebarNav className="w-full md:w-64" />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <DashBoard_Navbar />
          <div className="max-w-6xl mx-auto">
            <div className="text-center p-8">
              <h2 className="text-xl text-red-400 mb-4">{error}</h2>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212]">
      <SidebarNav className="w-full md:w-64" />
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <DashBoard_Navbar />
        
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
            <Newspaper className="w-6 h-6 text-blue-400" />
            Latest News & Updates
          </h1>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#191919] rounded-lg p-4 animate-pulse">
                  <div className="h-40 bg-[#232323] rounded-lg mb-4" />
                  <div className="h-4 bg-[#232323] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#232323] rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {news.map((article, index) => (
                <div key={index} className="bg-[#191919] rounded-lg overflow-hidden hover:bg-[#1d1d1d] transition-colors">
                  {article.urlToImage && (
                    <img 
                      src={article.urlToImage} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                    <h2 className="text-white font-medium mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {article.source.name}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => window.open(article.url, '_blank')}
                      >
                        Read more <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}