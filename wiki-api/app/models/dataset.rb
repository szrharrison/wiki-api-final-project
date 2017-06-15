require "base64"

class Dataset
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  embedded_in :page
end
