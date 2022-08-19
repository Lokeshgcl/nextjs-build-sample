import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { v4 as uuidv4 } from "uuid";
const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsDataStatic() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getPostsDataFromServer() {
  const id = uuidv4();
  const title = uuidv4();
  const date = Date.now();
  return {
    id,
    title,
    date,
  };
}
