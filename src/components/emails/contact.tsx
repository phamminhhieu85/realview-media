import { ContactForm } from "@/schemas/contact";
import {
  Body,
  Container,
  Heading,
  Html,
  Tailwind,
  Text,
  Hr,
} from "@react-email/components";

interface Props {
  form: ContactForm;
}

export function Contact({ form }: Props) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-white m-auto">
          <Container className="border border-solid rounded-md mx-auto max-w-96 p-5 my-10">
            <Heading className="text-black text-lg">
              New contact for Realview
            </Heading>
            <Text>
              <strong>Name:</strong> {form.name}
            </Text>
            <Text>
              <strong>Email:</strong> {form.email}
            </Text>
            <Text>
              <strong>Phone:</strong> {form.phone}
            </Text>
            <Text>
              <strong>Type of business:</strong> {form.type}
            </Text>
            <Text>
              <strong>Description:</strong> {form.describe}
            </Text>

            <Hr className="my-6 border borde-solid mx-auto w-full" />

            <Text className="text-center">
              Realview Media - Automated email
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
