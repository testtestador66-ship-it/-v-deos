# usage: caps.sh in.mp4 audio.wav out.mp4  (caption timings from caps.txt: start|end|y|text)
F=/usr/share/fonts/opentype/inter/Inter-Black.otf
VF=""
while IFS='|' read -r a b y txt; do
  [ -z "$a" ] && continue
  VF="$VF${VF:+,}drawtext=fontfile=$F:fontsize=68:fontcolor=white:borderw=7:bordercolor=black:x=(w-text_w)/2:y=h*$y:text='$txt':enable='between(t,$a,$b)'"
done < caps.txt
ffmpeg -y -loglevel error -i "$1" -i "$2" -map 0:v -map 1:a -vf "$VF" -c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "$3"
