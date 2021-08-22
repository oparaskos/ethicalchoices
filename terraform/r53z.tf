resource "aws_route53_zone" "domain-public" {
  name    = var.domain
  comment = ""
}
