class ApiWiki
  include Mongoid::Document
  include ActiveModel::Serialization
  include Slugifiable
  field :name, type: String
  field :documentation, type: String
  field :slug, type: String

  before_validation :set_slug

  validates :slug, uniqueness: true

  has_many :pages, validate: false, autosave: true, dependent: :destroy do
    def slugs
      @target.map do |page|
        page.slug
      end
    end
    def get_by_slug(slug)
      @target.select do |page|
        page.slug == slug
      end
    end
    def all_deep
      combine_nested_pages(@target)
    end
  end

  belongs_to :account
end

def combine_nested_pages(pages, all=[])
  pages.each do |page|
    all << page
    if page.sub_pages.count != 0
      combine_nested_pages(page.sub_pages, all)
    end
  end
  all
end
