class Page
  include Mongoid::Document
  include ActiveModel::Serialization
  include Slugifiable

  field :name, type: String
  field :slug, type: String
  field :data_type, type: String
  field :relative_path, type: String

  validates :name, :slug, :relative_path, presence: true
  validates :api_wiki, presence: true, if: :has_no_parent?
  validates :relative_path, uniqueness: true


  before_validation :set_slug
  before_validation :set_relative_path

  belongs_to :api_wiki, optional: true
  belongs_to :parent_page, class_name: 'Page', inverse_of: 'sub_pages', optional: true
  embeds_one :dataset, validate: false

  has_many :sub_pages, class_name: 'Page', inverse_of: 'parent_page', dependent: :destroy, validate: false, autosave: true do
    def slugs
      tries ||= 3
      @target.map { |page| page.slug  }
    rescue TypeError
      tries -= 1
      if tries > 0
        retry
      end
    end

    def get_by_slug(slug)
      @target.select do |page|
        page.slug == slug
      end
    end
  end

  has_many :images, validate: false, autosave: true do
    def slugs
      @target.map { |image| image.slug  }
    end

    def get_by_slug(slug)
      @target.select do |image|
        image.slug == slug
      end
    end
  end

  def set_relative_path
    if has_no_parent?
      self.relative_path = self.api_wiki.slug + '/' + self.slug
    else
      self.relative_path = self.parent_page.relative_path + '/' + self.slug
    end
  end
  def has_no_parent?
    !self.parent_page?
  end
end
