terraform {
  backend "s3" {
    bucket  = "terraform.ethicalchoices.xyz"
    key     = "site/ethicalchoices.xyz/terraform.tfstate"
    region  = "eu-west-1"
    profile = "personal"
  }
}
