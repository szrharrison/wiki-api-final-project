class Image
  include Mongoid::Document
  include Slugifiable

  field :name, type: String
  field :alt_text, type: String
  field :slug, type: String
  field :image, type: Moped::BSON::Binary

  before_save :set_slug

  belongs_to :page
end
