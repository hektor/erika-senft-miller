require 'json'
require 'net/http'

unless require 'sanitize'
  puts 'missing sanitize gem'
  puts 'install with "gem install sanitize"'
  puts 'exiting...'
  exit 1
end

task default: :migrate_data_to_templates

DATA_DIR = File.expand_path("../_data/", __FILE__)
DATA_FILE = File.join(DATA_DIR, "esm-data.json")
desc "Migrate the JSON files located in the data directory into he appropriate project buckets as templates"
task :migrate_data_to_templates do 
  items = {}

  unless File.exist? DATA_FILE
    puts "missing #{DATA_FILE}, skipping"
    next
  end

  content = JSON.parse(File.read(DATA_FILE))
  sheets = content.keys
  approved_sheets = %w{ photo video text }
  valid_sheets = sheets & approved_sheets
  valid_sheets.each do |sheet|
    content[sheet].each do |blob|
      project_name =  Sanitize.fragment(blob["project"]).downcase.gsub(/[^0-9a-z\-]/, '-')
      items[project_name] ||= []

      if sheet == "photo"

        unless blob["image"] && blob["name"]  && blob["project"]
          puts "Invalid Photo submission!: "                
          puts "  skippping #{blob.inspect}"
          next 
        end

        remote_filename, extension =  blob["image"].split('/')[-1].split('.')

        filename = [
          project_name, 
          Sanitize.fragment(blob["name"]).downcase.gsub(/[^0-9a-z\-]/, '-'),
          remote_filename.downcase.gsub(/[^0-9a-z\-_]/, '-')[0,10],
        ].join('-') + ".#{extension}"

        root_path = "#{File.join('/', 'assets', 'images', project_name )}"

        img_dir = File.expand_path(('..' + root_path), __FILE__)

        unless Dir.exist?(img_dir)
          puts 'creating ' + img_dir
          `mkdir -p #{img_dir}`
        end

        filepath = File.join(img_dir, filename)
        webpath = File.join(root_path, filename)

        unless File.exist? filepath
          puts "downloading " + blob["image"]
          remote_file_body = Net::HTTP.get(URI(blob["image"]))

          puts "creating " + filepath
          File.write(filepath, remote_file_body)
        else
          puts "#{filepath} already exists, skipping"
        end

        items[project_name] << '<div class="item-image"> <img src="..' +  
          webpath +
          '" title="' + 
          Sanitize.fragment(blob["name"]) + 
          '" alt="' + Sanitize.fragment(blob["name"]) +
          '" /></div>'
      elsif sheet == "video"

        unless blob["videoid"] && blob["name"]  && blob["project"]
          puts "Invalid video submission!: "
          puts "  skippping #{blob.inspect}"
          next 
        end

        # only allow digit ids
        unless blob["videoid"] =~ /^\d+$/
          puts "Invalid video ID!: "
          puts "  skippping #{blob.inspect}"
          next
        end

        items[project_name] << ('<div class="item-video"><iframe src="https://player.vimeo.com/video/'+ Sanitize.fragment(blob["videoid"]) + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>')
      elsif sheet == "text"
        unless blob["text"] && blob["name"]  && blob["project"]
          puts "Invalid text submission!: "
          puts "  skippping #{blob.inspect}"
          next 
        end
        # TODO (do we want to credit commentors)
        items[project_name] << ('<div class="item-text"><p>' +
                                Sanitize.fragment(blob["text"]) + 
                                '</p><p>' + 
                                Sanitize.fragment(blob["name"]) + 
                                '</p></div>')
      end
    end
  end
  items.keys.select{|x| x != ""}.each do |proj|
    items_list = items[proj].shuffle
    include_file = "_includes/_projects/#{proj}-items.html"
    puts "writing updated " + include_file
    File.write(include_file, items_list.join("\n"))
  end
end