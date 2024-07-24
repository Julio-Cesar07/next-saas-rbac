export abstract class UseCase<Req, Res> {
	abstract execute(props: Req): Promise<Res>;
}
