class ApiWikiSerializer < ActiveModel::Serializer
  attributes :id, :owner, :name, :slug, :pages

  def id
    object.id.to_s
  end
  def owner
    object.account.username
  end
  def pages
    object.pages.all.map do |page|
      {
        id: page.id.to_s,
        name: page.name,
        relative_path: page.relative_path
      }
    end
  end
end
