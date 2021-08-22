resource "aws_s3_bucket" "site" {
  bucket = var.domain
}

resource "aws_s3_bucket_public_access_block" "block-public-access" {
	bucket = aws_s3_bucket.site.id
	block_public_acls   = true
	block_public_policy = true
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "access-identity-${var.domain}.s3.amazonaws.com"
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version : "2008-10-17",
    Id : "PolicyForCloudFrontPrivateContent",
    Statement : [
      {
        Sid : "1",
        Effect : "Allow",
        Principal : {
          AWS : aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn
        },
        Action : "s3:GetObject",
        Resource : "${aws_s3_bucket.site.arn}/*"
      }
    ]
  })
}
