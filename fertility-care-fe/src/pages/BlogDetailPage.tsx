import type { Blog } from "../models/Blog"
import { convertTimeAgoLabel } from "../functions/CommonFunction"
import { DEFAULT_AVATAR } from "../constants/ApplicationConstant"
import Footer from "../components/Footer"
import Header from "../components/Header"

interface BlogDetailPageProps {
  blog: Blog
  allBlogs: Blog[]
}

export default function BlogDetailPage({ blog, allBlogs }: BlogDetailPageProps) {

  const relatedBlogs = allBlogs.filter((b) => b.id !== blog.id && b.category === blog.category).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          {blog.imageUrl && (
            <div className="aspect-video overflow-hidden">
              <img src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-8">
            {/* Article Meta */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded-full">
                  {blog.category}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {convertTimeAgoLabel(blog.createdAt)}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  src={blog.avatarUrl || DEFAULT_AVATAR}
                  alt={blog.fullName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{blog.fullName}</p>
                  <p className="text-sm text-gray-600">
                    {blog.author.address}
                  </p>
                  <p className="text-sm text-gray-500">{blog.createdAt}</p>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">{blog.content}</p>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Các bài viết liên quan</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <article
                  key={relatedBlog.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    // This would navigate to the related blog
                    window.scrollTo(0, 0)
                  }}
                >
                  {relatedBlog.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedBlog.imageUrl || "/placeholder.svg"}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded-full mb-2">
                      {relatedBlog.category}
                    </span>
                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-teal-600 transition-colors">
                      {relatedBlog.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{relatedBlog.content}</p>
                    <div className="flex items-center mt-3 text-xs text-gray-500">
                      <span>{relatedBlog.fullName}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedBlog.createdAt}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer/>
    </div>
  )
}
