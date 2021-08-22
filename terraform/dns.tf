resource "aws_route53_record" "domain-A" {
  zone_id = aws_route53_zone.domain-public.zone_id
  name    = aws_route53_zone.domain-public.name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}