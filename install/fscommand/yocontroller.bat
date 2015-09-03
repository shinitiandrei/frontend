@echo off
color 0F
set generator="controller"

TITLE Yo %generator%
type UOLSAC.dat


cd ../../
echo Digite o nome do novo %generator% Angular e pressione ENTER:
set /p name=

yo angular:%generator% %name%