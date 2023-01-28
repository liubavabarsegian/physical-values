require 'rubyXL'

lt = [-1,5]
result_array = []
9.times do |row|

  lt_row = lt
  row_array = []
  (10-((row+2) % 2)).times do |hex|
    lt_row = [lt_row[0]+1,lt_row[1]-1]
    row_array.push(lt_row)
  end
  result_array.push(row_array)
  if row.even?
    lt[1] = lt[1]-1
  else
    lt[0] = lt[0]-1
  end
end

def get_lt_string(lt_array)
  replacements = 
  {
    # ⁰,⁻¹,⁻²,⁻³,⁻⁴,⁻⁵,⁻⁶,⁻⁷,⁻⁸,⁻⁹ 
    '1' => '¹', 
    '2' => '²',
    '3' => '³', 
    '4' => '⁴', 
    '5' => '⁵',
    '6' => '⁶', 
    '7' => '⁷', 
    '8' => '⁸',
    '9' => '⁹', 
    '0' => '⁰',
    '-' => '⁻'
  }
  word = "L#{lt_array[0]}T#{lt_array[1]}"
  word.gsub!(Regexp.union(replacements.keys), replacements)
  word
end

def get_normal_lt_string(lt_string)
  replacements = 
  {
    # ⁰,⁻¹,⁻²,⁻³,⁻⁴,⁻⁵,⁻⁶,⁻⁷,⁻⁸,⁻⁹ 
    '¹' => '1', 
    '²' => '2',
    '³' => '3', 
    '⁴' => '4', 
    '⁵' => '5',
    '⁶' => '6', 
    '⁷' => '7', 
    '⁸' => '8',
    '⁹' => '9', 
    '⁰' => '0',
    '⁻' => '-'
  }
  word = lt_string
  word.gsub!(Regexp.union(replacements.keys), replacements)
  word
end

def get_mlti_string(mlti)
  m_num = 0
  l_num = 0
  t_num = 0
  i_num = 0
  m_num = mlti.slice(mlti.index('M')+1,3).to_i unless mlti.index('M').nil?
  l_num = mlti.slice(mlti.index('L')+1,3).to_i unless mlti.index('L').nil?
  t_num = mlti.slice(mlti.index('T')+1,3).to_i unless mlti.index('T').nil?
  i_num = mlti.slice(mlti.index('I')+1,3).to_i unless mlti.index('I').nil?
  if (!mlti.index('M').nil? && m_num == 0) 
  m_num = 1 end
  if (!mlti.index('L').nil? && l_num == 0) 
  l_num = 1 end
  if (!mlti.index('T').nil? && t_num == 0)
  t_num = 1 end
  if (!mlti.index('I').nil? && i_num == 0)
  i_num = 1 end
  return "M: #{m_num}, L: #{l_num}, T: #{t_num}, I: #{i_num}"
end

p get_mlti_string("T")

result_array.each {|row| row.map! {|lt| lt = get_lt_string(lt)}}
# File.open("test.txt", 'w') { |file| file.write(result_array) }

def findLT(lt,gk)
  workbook = RubyXL::Parser.parse("./Kniga_velichiny_FV.xlsx")
  worksheet = workbook.worksheets[0]
  i = 0
  while (!(worksheet[i].nil?)) do
    lt_sheet = worksheet[i][0].value
    gk_sheet = worksheet[i][1].value
    if (lt_sheet == lt && gk_sheet == gk)
      return i
    end
    i +=1 
  end
  return nil
end

workbook = RubyXL::Parser.parse("./Kniga_velichiny_FV.xlsx")
worksheet = workbook.worksheets[0]

def get_color(gk)
  gk_color = {  
    "G⁰K⁰" => "yellow",
    "G¹K⁰" => "gray",
    "G⁻¹K⁰" => "grideperlevy",
    "G²K⁰" => "dark_gray",
    "G⁰K¹" => "sky",
    "G¹K¹" => "light_green",
    "G¹K²" => "vinous",
    "G²K²" => "dark_green",
    "G⁰K⁻¹" => "blue",
    "G¹K⁻¹" => "mint",
    "G²K⁻¹" => "white_blue",
    "G⁻¹K⁻¹" => "swamp",
    "G⁰K⁻²" => "dark_blue",
    "G⁻¹K⁻²" => "purple"
}
return gk_color[gk]
end

def convert_lt(lt)
  ltn = lt.gsub(/LT/,"L¹T").gsub(/T\z/,"T¹")
  ltn
end

res = "{"
gk_array = ["G⁰K⁰","G¹K⁰","G⁻¹K⁰","G²K⁰","G⁰K¹","G¹K¹","G¹K²","G²K²","G⁰K⁻¹","G¹K⁻¹","G²K⁻¹","G⁻¹K⁻¹","G⁰K⁻²","G⁻¹K⁻²"]
result_array.each_with_index do |row,index|

  res += "row#{index+1}: {\n"

  row.each_with_index do |hex,index|
    res += "\"#{hex}\": [\n"
    gk_array.each do |gk|
      table_row_number = findLT(hex,gk)
      if false#table_row_number != nil
        table_row = worksheet[table_row_number]
        name = "null"
        color = ""
        usl_ob = ""
        mlti = "M: 0, L: 0, T: 0, I: 0"
        ed_izm = ""
        ob_ed_izm = ""
        lt = ""
        gk = ""
        name = table_row[2].value unless table_row[2].value.nil?
        color = table_row[7].value unless table_row[7].value.nil?
        usl_ob = table_row[3].value unless table_row[3].value.nil?
        mlti = get_mlti_string(get_normal_lt_string(table_row[6].value)) unless table_row[6].value.nil?
        ed_izm = table_row[4].value unless table_row[4].value.nil? 
        ob_ed_izm = table_row[5].value unless table_row[5].value.nil?
        lt = convert_lt(table_row[0].value) unless table_row[0].value.nil?
        gk = table_row[1].value unless table_row[1].value.nil?
        res += "{\"#{gk}\":{name: \"#{name}\", color: \"#{color}\", usl_ob: \"#{usl_ob}\", #{mlti}, ed_izm: \"#{ed_izm}\", ob_ed_izm: \"#{ob_ed_izm}\", LT: \"#{lt}\", GK: \"#{gk}\"}},\n"
      else
        lt = hex
        color = get_color(gk)
        res += "{\"#{gk}\":{name: \"\", color: \"#{color}\", usl_ob: \"\", M:  0, L: 0, T: 0, I: 0, ed_izm: \"\", ob_ed_izm: \"\", LT: \"#{lt}\", GK: \"#{gk}\"}},\n"
      end
      p hex
    end
    res += "],\n"
  end
  res += "},\n"
end
res += "}"
File.open("res.txt", 'w') { |file| file.write(res) }
