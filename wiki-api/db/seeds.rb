# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'
require 'json'
account = Account.first
pokeapi = account.api_wikis.second



#####################################################
# Add object data_type to subpages in Pokemon API   #
#####################################################
#
# pokeapi.pages.each do |page|
#   page.sub_pages.each do |sub_page|
#     p sub_page
#   end
# end


#####################################################
# Add Generations to Generation page in Pokemon API #
#####################################################
#
# all_generations = pokeapi.pages.find_by(slug: 'generation')
# (1..6).each do |num|
#   generation_page = all_generations.sub_pages.new( name: num )
#
#   generation = {}
#   open("http://pokeapi.co/api/v2/generation/#{num}") do |f|
#     f.each_line do |line|
#       generation = JSON.parse(line)
#     end
#   end
#
#   new_generation = generation.keys.each_with_object({}) do |key, hash|
#     if key != 'names' && key != 'pokemon_species' && key != 'moves'
#       hash[key] = generation[key]
#     end
#   end
#   generation_page.dataset = Dataset.new(new_generation)
#
#   generation_page.save
#   p generation_page
#   puts
#   p generation_page.dataset
#   puts
#   puts 'M' * 120
# end


#####################################################
# Add Types to Type page in Pokemon API             #
#####################################################
#
# all_types = pokeapi.pages.second
# (11..18).each do |num|
#   type_page = all_types.sub_pages.new( name: num )
#
#   type = {}
#   open("http://pokeapi.co/api/v2/type/#{num}") do |f|
#     f.each_line do |line|
#       type = JSON.parse(line)
#     end
#   end
#
#   new_type = type.keys.each_with_object({}) do |key, hash|
#     if key != 'names' && key != 'game_indices'
#       hash[key] = type[key]
#     end
#   end
#   type_page.dataset = Dataset.new(new_type)
#
#   type_page.save
#   p type_page
#   puts
#   p type_page.dataset
#   puts
#   puts '&' * 120
# end





#####################################################
# Add Pokemon to Pokemon page in Pokemon API        #
#####################################################
#
# all_pokemon = pokeapi.pages.first
# (10..50).each do |num|
#   pokemon = {}
#   open("http://pokeapi.co/api/v2/pokemon/#{num}") do |f|
#     f.each_line do |line|
#       pokemon = JSON.parse(line)
#     end
#   end
#   new_pokemon = pokemon.keys.each_with_object({}) do |key, hash|
#     if key != 'moves' && key != 'game_indices' && key != 'held_items'
#       hash[key] = pokemon[key]
#     end
#   end
#
#   pokemon_page = all_pokemon.sub_pages.new( name: num)
#   pokemon_page.save
#   pokemon_page.dataset = Dataset.new(new_pokemon)
#   pokemon_page.save
#   p pokemon_page.relative_path
#   puts
#   p pokemon_page.dataset
#   puts
#   puts '$' * 120
# end
