require "base64"

class Dataset
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  embedded_in :page
  def replace_data(new_data)
    self.as_json.keys.each do |field|
      if (!new_data.keys.include?(field)) && field != '_id'
        remove_attribute(field)
      end
    end
    update_attributes( new_data )
  end
end
