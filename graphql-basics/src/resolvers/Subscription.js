//*Goal: Create a subscription for new posts
//*1. Define "post" subscription, No arguments are required, Resp should be a post object.
//*2. Setup the resolver for post. Since there are no args, a channel name like 'post' is fine.
//*3. Modify the mutation for creating a post to publish the new post data.
  // - Only call pubSub.publish if the post had "published" = true
  // - Don't worry about updatePost or deletePost
//*4. Test your work!


const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubSub }, info) {
      const post = db.posts.find(post => post.id === postId && post.published);

      if (!post) {
        throw new Error("Post not found");
      }

      return pubSub.asyncIterator(`comment ${postId}`)
    }
  },
  post: {
    subscribe(parent, { postId }, { db, pubSub }, info) {
      return pubSub.asyncIterator(`post`);
    }
  }
};

export { Subscription as default };