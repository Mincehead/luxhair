-- Insert default services if they don't exist
INSERT INTO public.services (name, description, price, duration_min, image_url, active)
VALUES 
  ('Hair Cut & Style', 'Professional hair cut and styling session.', 50.00, 60, '/services/cut.jpg', true),
  ('Color Treatment', 'Full hair color treatment using premium products.', 120.00, 120, '/services/color.jpg', true)
ON CONFLICT DO NOTHING;
