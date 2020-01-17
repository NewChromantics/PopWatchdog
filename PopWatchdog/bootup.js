Pop.Debug("Hello i am watchdog");

//	todo: config file
const RunCommand = "cmd /c msg %USERNAME% Configure Watchdog/Bootup.js to specify program to keep alive";
const DelayBetweenRestartMs = 3000;

async function RunForver()
{
	while (true)
	{
		const Program = new Pop.ShellExecute(RunCommand);
		const ErrorCode = await Program.WaitForExit();
		Pop.Debug(`[${RunCommand}] has exited (${ErrorCode}), waiting ${DelayBetweenRestartMs} ms before restarting...`);
		await Pop.Yield(DelayBetweenRestartMs);
	}
}

RunForver().then().catch(Pop.Debug);