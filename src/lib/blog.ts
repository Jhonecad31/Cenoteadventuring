
if (import.meta.env.DEV) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export interface SeoMetadata {
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
}

export interface BlogPost {
  id: number; 
  siteId: string;
  tableName: string; 
  postAuthor: number;
  postDate: string;
  postTitle: string;
  postContent: string;
  postExcerpt: string;
  postName: string;
  postStatus: string;
  guid: string;
  seoData: SeoMetadata; 
}

const BASE_URL = import.meta.env.PUBLIC_CMS_API_URL || "https://romantic-spence.74-208-70-235.plesk.page/api/Content";
const SITE_ID = import.meta.env.PUBLIC_SITE_ID || "5c88eee8-450d-4154-9c25-310217861130";
const TABLE_NAME = import.meta.env.PUBLIC_TABLE_NAME || "cenote";

export const getBlogs = async (
  siteId = SITE_ID,
  tableName = TABLE_NAME,
  preview = false,
  locale = 'en'
): Promise<BlogPost[]> => {
  try {
    const url = new URL(`${BASE_URL}/getPosts`);
    url.searchParams.append("siteId", siteId);
    url.searchParams.append("TableName", tableName);
    url.searchParams.append("lang", locale);
    
    console.log(`Fetching blogs for locale: ${locale} from:`, url.toString());
    
    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(`Error fetching blogs: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    console.log(`Successfully fetched ${data.length} posts from CMS for locale: ${locale}`);

    if (data.length > 0) {
      console.log("Sample post status:", data[0].postStatus);
      console.log("Sample post title:", data[0].postTitle);
    }

    // En modo preview se incluyen también los borradores
    if (preview) {
      return data as BlogPost[];
    }

    const publishedPosts = (data as BlogPost[]).filter(post => {
      const status = post.postStatus?.toLowerCase();
      return status === 'publish' || status === 'published';
    });
    console.log(`Found ${publishedPosts.length} published posts for locale: ${locale}`);
    
    return publishedPosts;
  } catch (error) {
    console.error("Fetch error in getBlogs:", error);
    return [];
  }
};

export const getPostBySlug = async (
  slug: string,
  siteId = SITE_ID,
  tableName = TABLE_NAME,
  preview = false,
  locale = 'en'
): Promise<BlogPost | null> => {
  const blogs = await getBlogs(siteId, tableName, preview, locale);
  const normalizedSlug = slug.toLowerCase().trim();
  return blogs.find(post => post.postName?.toLowerCase().trim() === normalizedSlug) || null;
};

