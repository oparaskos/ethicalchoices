locals {
  zones = {
    (aws_route53_zone.domain-public.name) = aws_route53_zone.domain-public.zone_id,
    "www.${aws_route53_zone.domain-public.name}" = aws_route53_zone.domain-public.zone_id
  }
}

resource "aws_acm_certificate" "cert" {
  provider          = aws.acm
  domain_name       = aws_route53_zone.domain-public.name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  subject_alternative_names = [
    aws_route53_zone.domain-public.name,
    "www.${aws_route53_zone.domain-public.name}",
  ]

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }
}

resource "aws_route53_record" "acm_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = local.zones[dvo.domain_name]
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id
}

resource "aws_acm_certificate_validation" "cert" {
  provider                = aws.acm
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.acm_validation : record.fqdn]
}