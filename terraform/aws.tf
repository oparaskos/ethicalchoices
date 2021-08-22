provider "aws" {
  region  = "eu-west-1"
  profile = "personal"
}

provider "aws" {
  alias   = "acm"
  region  = "us-east-1"
  profile = "personal"
}