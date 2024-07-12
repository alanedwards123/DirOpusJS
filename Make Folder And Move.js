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

	// DOpus.Output("\n")

	var selected_files = clickData.func.sourcetab.selected_files
	var destPath = clickData.func.desttab.path

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
		fileName = fileList[0].path.filepart + fileList[0].ext
		var destFolder = destPath + '\\' + fileList[0].name_stem
		
		var cmd = DOpus.Create.Command() 

		var newCommand = 'CreateFolder "%foldername%"'
		
		newCommand = newCommand.replace("%foldername%", destFolder)
		
		DOpus.Output("Command: "+newCommand)

		cmd.addLine(newCommand)
		cmd.Run
		
		cmd = DOpus.Create.Command() 

		newCommand = 'Copy MOVE "%fromfile%" TO "%tofile%"'
		
		newCommand = newCommand.replace("%fromfile%", fileList[0].path + '\\' + fileList[0].name)
		newCommand = newCommand.replace("%tofile%", destFolder)

		DOpus.Output("Command: "+newCommand)

		cmd.addLine(newCommand)
		cmd.Run
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
