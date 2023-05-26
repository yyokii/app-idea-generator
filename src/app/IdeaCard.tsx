import { Idea } from '@/model/idea'
import { Card, CardBody, CardHeader, Heading, Text } from '../components'

type Props = {
  data: string
  // description: string
}

function IdeaCard(props: Props) {
  return (
    <Card align='center'>
      {/* <CardHeader>
        <Heading size='md'> {props.name}</Heading>
      </CardHeader> */}
      <CardBody>
        <Text>{props.data}</Text>
      </CardBody>
    </Card>
  )
}

export { IdeaCard }
