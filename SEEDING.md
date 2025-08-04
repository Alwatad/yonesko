# Database Seeding Guide

## Environment Variable Control

The seeding system uses the `REQUIRES_SEEDING` environment variable to control when seeding runs.

### Usage Scenarios

#### 🆕 **Fresh Deployment (New Client Site)**
```bash
# Set in your deployment environment
REQUIRES_SEEDING=true

# Or run locally
REQUIRES_SEEDING=true pnpm seed
```

#### 🔄 **Update Deployment (Existing Site)**
```bash
# Don't set REQUIRES_SEEDING or set to false
REQUIRES_SEEDING=false

# Seeding will be skipped automatically
```

#### 🧪 **Local Development**
```bash
# Force seeding for development
REQUIRES_SEEDING=true npx dotenv-cli -f .env tsx src/seed/index.ts
```

### Deployment Platform Examples

#### **Vercel**
```bash
# Environment Variables in Vercel Dashboard
REQUIRES_SEEDING=true    # For initial deployment
REQUIRES_SEEDING=false   # For subsequent deployments
```

#### **Netlify**
```bash
# netlify.toml or environment variables
REQUIRES_SEEDING=true
```

#### **Railway/Render**
```bash
# Set in platform environment variables
REQUIRES_SEEDING=true
```

### Build Script Behavior

The build script (`pnpm build`) includes seeding, but it will:
- ✅ **Run seeding** when `REQUIRES_SEEDING=true`
- ⏭️ **Skip seeding** when `REQUIRES_SEEDING` is not set or false

### What Gets Seeded

When `REQUIRES_SEEDING=true`:
- ✅ Product categories & subcategories
- ✅ Sample products (without images)
- ✅ Pages (Home, About, Contact, Terms)
- ✅ Database cleanup (removes existing data)
- ⏭️ Media files (skipped - upload manually to Supabase Storage)
- ⏭️ Global settings (configure manually in admin)

### Manual Configuration After Seeding

1. **Upload media files** to Supabase Storage bucket
2. **Configure header navigation** in PayloadCMS admin
3. **Set up global settings** (footer, shop settings, etc.)

### Troubleshooting

- **Missing secret key**: Ensure `PAYLOAD_SECRET` is set in environment
- **Database connection**: Verify Supabase connection string
- **Permission errors**: Check database user permissions

---

> 💡 **Pro Tip**: Set `REQUIRES_SEEDING=true` for your initial production deployment, then change it to `false` or remove it for all subsequent deployments.