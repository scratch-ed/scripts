#! /bin/bash 
#args: filenames without .md in the markdown directory
# -a: all files in the markdown directory

generateFiles() {
	for NAME in "$@"
	do
	echo 'generate' $NAME'.html'
	./pandoc.exe markdown/$NAME.md\
	    -f markdown \
	    -t html5 \
	    -o web/$NAME.html \
	    --include-in-header='head.html'
	done
}  

generateFilesInDirectory() {
	for FILE in markdown/*.md
	do
		NAME=${FILE/markdown\//} 
		NAME=${NAME/\.md/} 
		generateFiles $NAME
	done
}



while getopts ":a" opt; do
  case $opt in
    a)
      generateFilesInDirectory
      exit
      ;;
  esac
done


generateFiles $@




