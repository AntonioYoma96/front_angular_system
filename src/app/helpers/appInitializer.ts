import { AuthenticationService } from 'src/app/services/authentication.service';

export function appInitializer(
  authenticationService: AuthenticationService
): () => Promise<unknown> {
  return () =>
    new Promise((resolve) => {
      authenticationService.refreshToken().subscribe().add(resolve);
    });
}
