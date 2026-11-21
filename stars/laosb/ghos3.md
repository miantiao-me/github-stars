---
project: ghos3
stars: 55
description: |-
    A modernized AWS S3 storage adapter for Ghost.
url: https://github.com/laosb/ghos3
---

# GhoS3

An AWS S3 storage adapter tested on Ghost 5.x.

This is a modernized version based on [colinmeinke/ghost-storage-adapter-s3](https://github.com/colinmeinke/ghost-storage-adapter-s3). Major changes are:

- Adopted `async`/`await`
- Rewritten in TypeScript
- Use latest Version 3 of AWS SDK

It's designed to be a drop-in replacement of colinmeinke's package, so configuration and installation method remained largely the same.

However, this port pretty much targets only Ghost 5.x and up, as the build toolchain is set to target Node 16.x. With some modifications this should work for older version of Ghost (PRs welcomed).

On my blog [_The Base_](https://base.of.sb), I use [Cloudflare R2](https://www.cloudflare.com/zh-tw/products/r2/) with GhoS3.

## Installation

```bash
# Install ghos3 package
npm install ghos3

# Create directory to storage adapter
mkdir -p ./content/adapters/storage

# Copy package files to s3 storage folder
cp -r ./node_modules/ghos3/* ./content/adapters/storage/s3

# Remove unnecessary files generated from ghos3 installation
rm -Rf node_modules package-lock.json package.json

# Move to s3 storage folder
cd ./content/adapters/storage/s3

# Resolve dependencies
npm install
```

## Configuration

Largely the same, but note `signatureVersion` and `serverSideEncryption` are removed since in AWS SDK v3 they're implemented differently than just a simple string field (PRs welcomed, of course).

```json
"storage": {
  "active": "s3",
  "media":{
     "adapter": "s3"
  },
  "files": {
    "adapter": "s3"
  },
  "s3": {
    "accessKeyId": "YOUR_ACCESS_KEY_ID",
    "secretAccessKey": "YOUR_SECRET_ACCESS_KEY",
    "region": "YOUR_REGION_SLUG",
    "bucket": "YOUR_BUCKET_NAME",
    "assetHost": "YOUR_OPTIONAL_CDN_URL (See note 1 below)",
    "pathPrefix": "YOUR_OPTIONAL_BUCKET_SUBDIRECTORY",
    "endpoint": "YOUR_OPTIONAL_ENDPOINT_URL (only needed for 3rd party S3 providers)",
    "forcePathStyle": true,
    "acl": "YOUR_OPTIONAL_ACL (See note 3 below)",
  }
}
```

### Notes

1. Be sure to include `//` or the appropriate protocol within your `assetHost` string/variable to ensure that your site's domain is not prepended to the CDN URL.
2. If your S3 provider requires path style, you can enable it with `forcePathStyle`.
3. If you use CloudFront the object ACL does not need to be set to `public-read`.

### Via environment variables

```
AWS_DEFAULT_REGION
AWS_ACCESS_KEY_ID // optional
AWS_SECRET_ACCESS_KEY // optional
GHOST_STORAGE_ADAPTER_S3_PATH_BUCKET
GHOST_STORAGE_ADAPTER_S3_ASSET_HOST  // optional
GHOST_STORAGE_ADAPTER_S3_PATH_PREFIX // optional
GHOST_STORAGE_ADAPTER_S3_ENDPOINT // optional
GHOST_STORAGE_ADAPTER_S3_FORCE_PATH_STYLE // optional
GHOST_STORAGE_ADAPTER_S3_ACL // optional
```

For configuration on the AWS side, colinmeinke's original README has a detailed [tutorial](https://github.com/colinmeinke/ghost-storage-adapter-s3/tree/master#aws-configuration) to set your up.

## License

[ISC](./LICENSE.md)

