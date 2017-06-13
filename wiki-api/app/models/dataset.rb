require "base64"

class Dataset
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  field :default, default: 'default'

  embedded_in :page
end
