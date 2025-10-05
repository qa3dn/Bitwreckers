# Blog Interactions System Setup

This guide will help you set up the real-time like and view tracking system for the blog.

## 🚀 Quick Setup

### 1. Create the Interactions Table

Run this SQL script in your Supabase SQL Editor:

```sql
-- Run the create_blog_interactions_table.sql file
```

Or copy and paste the contents of `admin/create_blog_interactions_table.sql` into the Supabase SQL Editor.

### 2. Test the System

1. **Open the blog page**: `http://localhost:3000/blog`
2. **Click on any article** to view it
3. **Try liking/unliking** articles
4. **Refresh the page** to see view counts increase
5. **Check different devices/browsers** to see separate like counts

## 🔧 How It Works

### User Identification
- Each user gets a unique identifier based on their browser fingerprint
- This prevents duplicate likes from the same user
- Views are also tracked per user to avoid inflating counts

### Like System
- ✅ **One like per user per post**
- ✅ **Toggle functionality** (like/unlike)
- ✅ **Real-time count updates**
- ✅ **Persistent across sessions**

### View System
- ✅ **One view per user per post**
- ✅ **Automatic tracking** on page load
- ✅ **Real-time count updates**
- ✅ **No duplicate views** from same user

## 📊 Database Structure

### `blog_interactions` Table
```sql
- id: UUID (Primary Key)
- post_id: UUID (Foreign Key to blog_posts)
- user_identifier: TEXT (Browser fingerprint)
- interaction_type: TEXT ('like' or 'view')
- created_at: TIMESTAMP
```

### Key Features
- **Unique constraint** on (post_id, user_identifier, interaction_type)
- **Automatic count updates** in blog_posts table
- **RLS policies** for public access
- **Performance indexes** for fast queries

## 🎯 API Endpoints

### Like API
- **POST** `/api/blog/like` - Toggle like status
- **GET** `/api/blog/like?postId=...&userIdentifier=...` - Get like status

### View API
- **POST** `/api/blog/view` - Record view
- **GET** `/api/blog/view?postId=...` - Get view count

## 🔍 Testing

### Test Like System
1. Open an article
2. Click the heart button
3. Should turn red and increment count
4. Click again to unlike
5. Count should decrease

### Test View System
1. Open an article
2. Check view count
3. Refresh the page
4. View count should stay the same (same user)
5. Open in different browser/device
6. View count should increase

### Test Cross-Device
1. Like an article on one device
2. Open same article on different device
3. Should show different like status
4. Each device can like independently

## 🛠️ Troubleshooting

### Common Issues

#### "relation blog_interactions does not exist"
- Run the SQL script to create the table
- Check Supabase connection

#### Likes not working
- Check browser console for errors
- Verify API endpoints are accessible
- Check Supabase RLS policies

#### View counts not updating
- Check if user identifier is being generated
- Verify view API is being called
- Check network tab for failed requests

### Debug Mode
Add this to your browser console to see debug info:
```javascript
// Check user identifier
console.log('User ID:', localStorage.getItem('userIdentifier'));

// Check like status
fetch('/api/blog/like?postId=YOUR_POST_ID&userIdentifier=YOUR_USER_ID')
  .then(r => r.json())
  .then(console.log);
```

## 📈 Analytics

The system tracks:
- **Total likes per post**
- **Total views per post**
- **User engagement patterns**
- **Popular content identification**

## 🔒 Privacy

- **No personal data stored**
- **Browser fingerprint only**
- **No tracking across sites**
- **GDPR compliant**

## 🚀 Future Enhancements

Potential additions:
- **Like notifications**
- **Most liked posts widget**
- **View analytics dashboard**
- **Social sharing tracking**
- **Comment system integration**

---

**✅ System is now ready for production use!**
