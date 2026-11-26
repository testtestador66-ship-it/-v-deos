# grid of prev frames: 7 per row, 270x480 each
files=$(ls prev/f_*.jpg | sort -t_ -k2 -n)
i=0; rows=""
for f in $files; do ffmpeg -y -loglevel error -i $f -vf "scale=240:427,drawtext=fontfile=/usr/share/fonts/opentype/inter/Inter-Black.otf:text='$(basename $f .jpg | cut -c3-)':x=8:y=8:fontsize=28:fontcolor=yellow:borderw=3" /tmp/g_$(printf %03d $i).jpg; i=$((i+1)); done
ffmpeg -y -loglevel error -framerate 1 -i /tmp/g_%03d.jpg -vf "tile=8x3:color=black" -frames:v 1 grid.jpg
rm /tmp/g_*.jpg
