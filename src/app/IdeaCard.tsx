import { Idea } from '@/model/idea'
import { Card, CardBody, CardHeader, Heading, Text } from '../components'

type Props = {
  idea: Idea
}

function IdeaCard(props: Props) {
  return (
    <Card align='center'>
      <CardHeader>
        <Heading size='md'> {props.idea.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{props.idea.description}</Text>
      </CardBody>
    </Card>
  )
}

export { IdeaCard }
