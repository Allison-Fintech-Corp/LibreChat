# Deploy Allison to Railway

## Quick Deploy (Recommended)

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Add Railway deployment config"
   git push origin main
   ```

2. **Deploy on Railway**:
   - Go to [railway.app](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select your LibreChat-main repository
   - Railway will auto-detect and deploy

## Manual Setup

### Step 1: Create Services
In Railway dashboard, create these services:

1. **MongoDB**
   - Template: MongoDB
   - Database name: `allison`

2. **MeiliSearch** 
   - Template: MeiliSearch
   - Set `MEILI_NO_ANALYTICS=true`

3. **PostgreSQL**
   - Template: PostgreSQL with pgvector
   - Database: `allison`
   - User: `allison`

4. **Allison App**
   - Deploy from GitHub repo
   - Use `Dockerfile.railway`

### Step 2: Environment Variables
Set these in your Allison service:

```
APP_TITLE=Allison
NODE_ENV=production
HOST=0.0.0.0
PORT=3080
OPENROUTER_API_KEY=your_key_here
MONGO_URI=${{MongoDB.MONGO_URL}}
MEILI_HOST=${{MeiliSearch.MEILI_URL}}
DATABASE_URL=${{PostgreSQL.DATABASE_URL}}
```

### Step 3: Custom Domain (Optional)
- Go to Settings > Networking
- Add custom domain for professional bank demo
- Example: `allison-demo.yourdomain.com`

## Environment Variables Reference

**Required:**
- `OPENROUTER_API_KEY` - Your OpenRouter API key
- `APP_TITLE=Allison` - Application title
- `MONGO_URI` - MongoDB connection (auto-filled by Railway)
- `MEILI_HOST` - MeiliSearch URL (auto-filled by Railway)

**Optional:**
- `CUSTOM_FOOTER` - Custom footer text
- `MEILI_MASTER_KEY` - MeiliSearch master key (auto-generated)
- `DATABASE_URL` - PostgreSQL URL for vector storage

## Estimated Costs

**Free Trial**: $5 credit (~2-3 days)
**Pro Plan**: $20/month minimum
**Expected Usage**: ~$80-100/month for full deployment

## Troubleshooting

**Build fails:**
- Check build logs in Railway dashboard
- Ensure all package.json files are present

**App won't start:**
- Verify environment variables are set
- Check that OPENROUTER_API_KEY is valid

**Database connection issues:**
- Ensure MongoDB and MeiliSearch services are running
- Check service URLs in environment variables
