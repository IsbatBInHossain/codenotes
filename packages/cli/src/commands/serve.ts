import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';
type CustomError = Error & {
  code: string;
  errno: number;
  syscall: string;
  address: string;
  port: number;
};

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run the server on', '6060')
  .action(async (filename = 'codenotes.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit.`
      );
    } catch (err) {
      if ((err as CustomError).code === 'EADDRINUSE') {
        console.error('Port already in use. Try running on a different port');
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.log(String(err));
      }
      process.exit(1);
    }
  });
