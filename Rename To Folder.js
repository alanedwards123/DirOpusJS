// Every script that lives in a button or hotkey needs
// the OnClick function below. 

// It is the script's main entry point. 

// The function has one argument: clickData. 
// clickData is an object that Opus passes to the function. 
// clickData has a func property: a Func object which has useful 
// attributes and methods. 

function OnClick(clickData) 
{
	// clickData.func.command.RunCommand("Set UTILITY=otherlog") // Uncomment to enable logging

	var selected_files = clickData.func.sourcetab.selected_files
	var num_files = selected_files.count 

	var fileList = [] 
	var enumFiles = new Enumerator(selected_files) 
		
	var currentFile 
		
	while (!enumFiles.atEnd()) 
	{ 
		currentFile = enumFiles.item() 
		fileList.push(currentFile) 
		enumFiles.moveNext() 
	} 

	if (fileList.length == 1)
	{
		//DOpus.Output("\nCount: "+fileList.length)
		//DOpus.Output("Path: "+fileList[0].path.filepart)
		//DOpus.Output("File Count: "+num_files)
		//DOpus.Output("Ext: "+fileList[0].ext)

		fileName = fileList[0].path.filepart + fileList[0].ext
		
		//DOpus.Output("Final Name: "+fileName)
		
		var cmd = DOpus.Create.Command() 

		var newCommand = 'Rename FROM="%fromfile%" TO="%tofile%"'
		
		newCommand = newCommand.replace("%fromfile%", fileList[0])
		newCommand = newCommand.replace("%tofile%", fileName)

		//DOpus.Output("Command: "+newCommand)

		cmd.addLine(newCommand)
		cmd.Run
		
		//DOpus.Output("Done")

		//dlg.message = "Path: "+fileList[0]; 
		//dlg.buttons = "OK" 
		//dlg.Show(); 
	}
	else
	{
		var dlg = clickData.func.Dlg; 

		if (fileList.length == 0)
		{
			dlg.message = "No file selected"; 
			dlg.buttons = "OK" 
			dlg.Show(); 
		}
		else
		{
			dlg.message = "Multiple files selected, please only select one file"; 
			dlg.buttons = "OK" 
			dlg.Show(); 
		}
	}
}
